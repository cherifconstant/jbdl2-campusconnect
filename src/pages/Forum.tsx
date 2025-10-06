import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { MessageSquare, Send, Reply } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  id: string;
  subject: string;
  content: string;
  sender_id: string;
  sender_type: string;
  recipient_id: string;
  recipient_type: string;
  parent_message_id?: string;
  created_at: string;
  sender?: { full_name: string };
  replies?: Message[];
}

export default function Forum() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newSubject, setNewSubject] = useState('');
  const [newContent, setNewContent] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .is('parent_message_id', null)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch replies for each message
      const messagesWithReplies = await Promise.all(
        (data || []).map(async (message) => {
          const { data: replies } = await supabase
            .from('messages')
            .select('*')
            .eq('parent_message_id', message.id)
            .order('created_at', { ascending: true });

          return { ...message, replies: replies || [], sender: { full_name: 'Utilisateur' } };
        })
      );

      setMessages(messagesWithReplies);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newSubject.trim() || !newContent.trim()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('messages')
        .insert({
          subject: newSubject,
          content: newContent,
          sender_id: user.id,
          sender_type: 'parent',
          recipient_id: user.id,
          recipient_type: 'school'
        });

      if (error) throw error;

      toast.success('Message envoyé avec succès');
      setNewSubject('');
      setNewContent('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erreur lors de l\'envoi du message');
    }
  };

  const handleReply = async (messageId: string) => {
    if (!replyContent.trim()) {
      toast.error('Veuillez écrire une réponse');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('messages')
        .insert({
          subject: 'Re:',
          content: replyContent,
          sender_id: user.id,
          sender_type: 'parent',
          recipient_id: user.id,
          recipient_type: 'school',
          parent_message_id: messageId
        });

      if (error) throw error;

      toast.success('Réponse envoyée');
      setReplyContent('');
      setReplyTo(null);
      fetchMessages();
    } catch (error) {
      console.error('Error replying:', error);
      toast.error('Erreur lors de l\'envoi de la réponse');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <MessageSquare className="h-8 w-8" />
              Forum Parents-École
            </h1>
            <p className="text-muted-foreground mt-2">
              Espace d'échange et de communication avec l'équipe pédagogique
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Nouveau message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Sujet du message"
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
              />
              <Textarea
                placeholder="Votre message..."
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
              />
              <Button onClick={handleSendMessage} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Envoyer le message
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {loading ? (
              <p className="text-center">Chargement...</p>
            ) : messages.length === 0 ? (
              <Card>
                <CardContent className="py-8">
                  <p className="text-center text-muted-foreground">
                    Aucun message pour le moment
                  </p>
                </CardContent>
              </Card>
            ) : (
              messages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarFallback>
                          {message.sender?.full_name?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <div>
                          <p className="font-semibold">{message.subject}</p>
                          <p className="text-sm text-muted-foreground">
                            {message.sender?.full_name} • {new Date(message.created_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <p>{message.content}</p>

                        {message.replies && message.replies.length > 0 && (
                          <div className="ml-8 mt-4 space-y-4 border-l-2 pl-4">
                            {message.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start gap-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="text-xs">
                                    {reply.sender?.full_name?.[0] || 'U'}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{reply.sender?.full_name}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(reply.created_at).toLocaleDateString('fr-FR')}
                                  </p>
                                  <p className="text-sm mt-1">{reply.content}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {replyTo === message.id ? (
                          <div className="mt-4 space-y-2">
                            <Textarea
                              placeholder="Votre réponse..."
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              rows={3}
                            />
                            <div className="flex gap-2">
                              <Button onClick={() => handleReply(message.id)} size="sm">
                                Envoyer
                              </Button>
                              <Button onClick={() => setReplyTo(null)} size="sm" variant="outline">
                                Annuler
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <Button
                            onClick={() => setReplyTo(message.id)}
                            size="sm"
                            variant="outline"
                            className="mt-2"
                          >
                            <Reply className="h-4 w-4 mr-2" />
                            Répondre
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
