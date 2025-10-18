interface SavedNotificationProps {
  tag: string;
}

export function SavedNotification({ tag }: SavedNotificationProps) {
  return (
    <div className="bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-lg">
      Saved to AI Journal • Auto-tagged under {tag}.
    </div>
  );
}
