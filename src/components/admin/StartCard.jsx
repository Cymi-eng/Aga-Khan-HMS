import { Card, CardContent } from "@/components/ui/card";

export default function StatCard({
  title,
  value,
  icon: Icon,
  color = "text-blue-600",
}) {
  return (
    <Card className="shadow-sm hover:shadow-md transition">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className={`${color} bg-gray-100 p-4 rounded-full`}>
          <Icon size={30} />
        </div>
      </CardContent>
    </Card>
  );
}