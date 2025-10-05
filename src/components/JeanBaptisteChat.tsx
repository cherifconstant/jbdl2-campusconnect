import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const JeanBaptisteChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Bonjour ! Je suis Jean Baptiste, votre assistant virtuel. Comment puis-je vous aider aujourd\'hui ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const streamChat = async (userMessage: string) => {
    setIsLoading(true);
    
    const newMessages = [...messages, { role: 'user' as const, content: userMessage }];
    setMessages(newMessages);
    
    try {
      const { data, error } = await supabase.functions.invoke('jean-baptiste-chat', {
        body: { messages: newMessages }
      });

      if (error) throw error;

      if (!data) {
        throw new Error('Pas de réponse du serveur');
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim() || line.startsWith(':')) continue;
          if (!line.startsWith('data: ')) continue;

          const data = line.slice(6).trim();
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantMessage += content;
              setMessages([...newMessages, { role: 'assistant', content: assistantMessage }]);
            }
          } catch (e) {
            // Ignore parsing errors for incomplete chunks
          }
        }
      }
    } catch (error) {
      console.error('Erreur chat:', error);
      toast({
        title: "Erreur",
        description: "Impossible de contacter Jean Baptiste. Veuillez réessayer.",
        variant: "destructive",
      });
      setMessages(messages); // Restore previous messages
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input.trim();
    setInput('');
    await streamChat(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:scale-110 transition-transform z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-2xl z-50">
      <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <div>
            <h3 className="font-semibold">Jean Baptiste</h3>
            <p className="text-xs opacity-90">Assistant Virtuel</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  msg.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question..."
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JeanBaptisteChat;