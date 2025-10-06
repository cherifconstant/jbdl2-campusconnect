import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface ProgressChartProps {
  data: Array<{
    subject: string;
    grade: number;
    date: string;
  }>;
}

export default function ProgressChart({ data }: ProgressChartProps) {
  // Group data by subject
  const subjects = Array.from(new Set(data.map(d => d.subject)));
  
  // Get last 6 months of data
  const monthlyData = data.reduce((acc: any[], item) => {
    const month = new Date(item.date).toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' });
    const existing = acc.find(d => d.month === month);
    
    if (existing) {
      if (!existing[item.subject]) {
        existing[item.subject] = [];
      }
      existing[item.subject].push(item.grade);
    } else {
      acc.push({
        month,
        [item.subject]: [item.grade]
      });
    }
    
    return acc;
  }, []);

  // Calculate averages
  const chartData = monthlyData.map(month => {
    const result: any = { month: month.month };
    subjects.forEach(subject => {
      if (month[subject]) {
        result[subject] = (month[subject].reduce((a: number, b: number) => a + b, 0) / month[subject].length).toFixed(2);
      }
    });
    return result;
  }).slice(-6);

  const colors = ['#8b5cf6', '#06b6d4', '#f59e0b', '#10b981', '#ef4444'];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Graphique de Progression
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, 20]} />
            <Tooltip />
            <Legend />
            {subjects.map((subject, index) => (
              <Line
                key={subject}
                type="monotone"
                dataKey={subject}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
