import { cn } from "@/lib/utils";

interface BentoGridProps {
  className?: string;
  children?: React.ReactNode;
}

export function BentoGrid({ className, children }: BentoGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8", className)}>
      {children}
    </div>
  );
}

interface BentoCardProps {
  className?: string;
  title: string;
  icon?: React.ReactNode;
  description?: string;
  gradient?: "orange" | "brown" | "purple" | "green";
  features?: string[];
  children?: React.ReactNode;
}

export function BentoCard({
  className,
  title,
  icon,
  description,
  gradient = "orange",
  features,
  children,
}: BentoCardProps) {
  const gradientClasses = {
    orange: "from-hooper-orange to-hooper-orange/50",
    brown: "from-hooper-brown to-hooper-brown/50",
    purple: "from-purple-500 to-purple-500/50",
    green: "from-green-500 to-green-500/50",
  };

  return (
    <div className="bento-gradient">
      <div className={cn(
        "p-6 md:p-8 bg-hooper-dark-500 rounded-xl h-full flex flex-col",
        className
      )}>
        {icon && (
          <div className={cn(
            "w-12 h-12 mb-6 rounded-full flex items-center justify-center",
            `bg-gradient-to-br ${gradientClasses[gradient]}`
          )}>
            {icon}
          </div>
        )}
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        {description && <p className="text-hooper-dark-100 mb-6">{description}</p>}
        {features && (
          <ul className="space-y-3 mt-auto">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={cn("h-5 w-5 mr-2 mt-0.5", {
                    'text-hooper-orange': gradient === 'orange',
                    'text-hooper-brown': gradient === 'brown',
                    'text-purple-500': gradient === 'purple',
                    'text-green-500': gradient === 'green',
                  })}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </div>
  );
}
