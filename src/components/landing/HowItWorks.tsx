
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HOW_IT_WORKS_STEPS, APP_NAME } from '@/lib/constants';

export function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold font-headline text-center text-primary mb-12">
          How {APP_NAME} Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <Card key={index} className="text-center shadow-lg border-primary/20 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-col items-center">
                <div className="mb-4 p-4 bg-primary/10 rounded-full text-primary">
                  <step.icon className="h-10 w-10" />
                </div>
                <CardTitle className="text-xl font-semibold font-headline text-primary">
                  {index + 1}. {step.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

    