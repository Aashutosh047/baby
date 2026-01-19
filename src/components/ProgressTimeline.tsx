interface ProgressTimelineProps {
  stages: string[];
  currentStage: number;
}

const ProgressTimeline = ({ stages, currentStage }: ProgressTimelineProps) => {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="glass-card rounded-full px-4 py-2 flex items-center gap-2">
        {stages.map((stage, index) => (
          <div key={stage} className="flex items-center">
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index < currentStage
                  ? "bg-primary scale-100"
                  : index === currentStage
                  ? "bg-primary animate-pulse-glow scale-125"
                  : "bg-muted scale-75"
              }`}
              title={stage}
            />
            {index < stages.length - 1 && (
              <div
                className={`w-6 h-0.5 mx-1 transition-colors duration-300 ${
                  index < currentStage ? "bg-primary" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressTimeline;