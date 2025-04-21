export const getRoleColor = (role: string) => {
  if (!role) return "text-emerald-500 dark:text-neutral-700";

  switch (role?.toLowerCase()) {
    case "buyer":
      return "text-emerald-500 dark:text-green-500";
    case "seller":
      return "text-red-500 dark:text-orange-500";
    case "broker":
      return "text-p-secondary-2 dark:text-blue-500";
    default:
      return "text-emerald-500 dark:text-neutral-700";
  }
};
