import type { LucideIcon } from 'lucide-react';

interface ActionButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  label?: string;
  isActive?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export function ActionButton({ onClick, disabled = false, icon: Icon, label, isActive = false, type = 'button' }: ActionButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
        isActive ? 'tinted-science-accent' : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
      }`}
    >
      {Icon && <Icon className="w-4 h-4" />}
      {label && <span>{label}</span>}
    </button>
  );
}
