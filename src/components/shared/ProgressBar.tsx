import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  stepNames?: string[];
}

export function ProgressBar({ currentStep, totalSteps, stepNames }: ProgressBarProps) {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-2">
        {stepNames && stepNames.map((name, index) => (
          <div
            key={index}
            className={cn(
              "text-xs text-center flex-1",
              index + 1 < currentStep ? "text-primary" : 
              index + 1 === currentStep ? "text-primary font-semibold" : "text-muted-foreground"
            )}
          >
            {name}
          </div>
        ))}
      </div>
      <div className="relative w-full h-2 bg-muted rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-300 ease-in-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
       <p className="text-sm text-muted-foreground mt-2 text-center">
        Step {currentStep} of {totalSteps}
      </p>
    </div>
  );
}
