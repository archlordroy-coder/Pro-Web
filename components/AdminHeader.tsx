'use client';

interface AdminHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function AdminHeader({ title, description, action }: AdminHeaderProps) {
  return (
    <div className="mb-8 flex justify-between items-start gap-4">
      <div>
        <h1 className="text-4xl font-bold text-text-primary mb-2">{title}</h1>
        {description && (
          <p className="text-text-secondary">{description}</p>
        )}
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition whitespace-nowrap"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
