import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { ClipboardList, Send } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Survey {
  id: string;
  title: string;
  description: string;
  questions: any;
  anonymous: boolean;
}

export default function Surveys() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const { data, error } = await supabase
        .from('surveys')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSurveys(data || []);
    } catch (error) {
      console.error('Error fetching surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (surveyId: string, anonymous: boolean) => {
    setSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('survey_responses')
        .insert({
          survey_id: surveyId,
          user_id: anonymous ? null : user?.id,
          responses: responses[surveyId]
        });

      if (error) throw error;

      toast.success('Merci pour votre participation !');
      setResponses(prev => {
        const newResponses = { ...prev };
        delete newResponses[surveyId];
        return newResponses;
      });
    } catch (error) {
      console.error('Error submitting survey:', error);
      toast.error('Erreur lors de l\'envoi du sondage');
    } finally {
      setSubmitting(false);
    }
  };

  const updateResponse = (surveyId: string, questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [surveyId]: {
        ...prev[surveyId],
        [questionId]: value
      }
    }));
  };

  const getProgress = (surveyId: string, questionsLength: number) => {
    const answered = Object.keys(responses[surveyId] || {}).length;
    return (answered / questionsLength) * 100;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">Chargement...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <ClipboardList className="h-8 w-8" />
              Sondages & Avis
            </h1>
            <p className="text-muted-foreground mt-2">
              Partagez votre avis pour nous aider à améliorer l'expérience scolaire
            </p>
          </div>

          {surveys.length === 0 ? (
            <Card>
              <CardContent className="py-8">
                <p className="text-center text-muted-foreground">
                  Aucun sondage disponible pour le moment
                </p>
              </CardContent>
            </Card>
          ) : (
            surveys.map((survey) => {
              const progress = getProgress(survey.id, survey.questions.length);
              const isComplete = progress === 100;

              return (
                <Card key={survey.id}>
                  <CardHeader>
                    <CardTitle>{survey.title}</CardTitle>
                    {survey.description && (
                      <p className="text-muted-foreground">{survey.description}</p>
                    )}
                    {survey.anonymous && (
                      <p className="text-sm text-muted-foreground italic">
                        Ce sondage est anonyme
                      </p>
                    )}
                    <Progress value={progress} className="mt-4" />
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {survey.questions.map((question) => (
                      <div key={question.id} className="space-y-3">
                        <Label className="text-base">{question.question}</Label>
                        
                        {question.type === 'text' && (
                          <Textarea
                            value={responses[survey.id]?.[question.id] || ''}
                            onChange={(e) => updateResponse(survey.id, question.id, e.target.value)}
                            placeholder="Votre réponse..."
                            rows={4}
                          />
                        )}

                        {question.type === 'radio' && question.options && (
                          <RadioGroup
                            value={responses[survey.id]?.[question.id]}
                            onValueChange={(value) => updateResponse(survey.id, question.id, value)}
                          >
                            {question.options.map((option, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <RadioGroupItem value={option} id={`${question.id}-${idx}`} />
                                <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}

                        {question.type === 'scale' && (
                          <RadioGroup
                            value={responses[survey.id]?.[question.id]}
                            onValueChange={(value) => updateResponse(survey.id, question.id, value)}
                            className="flex gap-2"
                          >
                            {[1, 2, 3, 4, 5].map((num) => (
                              <div key={num} className="flex flex-col items-center">
                                <RadioGroupItem value={num.toString()} id={`${question.id}-${num}`} />
                                <Label htmlFor={`${question.id}-${num}`} className="text-xs mt-1">
                                  {num}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        )}
                      </div>
                    ))}

                    <Button
                      onClick={() => handleSubmit(survey.id, survey.anonymous)}
                      disabled={!isComplete || submitting}
                      className="w-full"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {submitting ? 'Envoi...' : 'Envoyer mes réponses'}
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </Layout>
  );
}
