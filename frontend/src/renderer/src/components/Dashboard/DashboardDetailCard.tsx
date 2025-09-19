import { Card } from "../ui/card";

type DashboardDetailCardProps = {
  title: string;
  value: number | string;
};
const DashboardDetailCard = ({ title, value }: DashboardDetailCardProps) => {
  return (
    <Card className="p-5">
      <span className="text-2xl font-semibold">
        {title}
        {":  "}
      </span>
      <span className="text-lg">{value}</span>
    </Card>
  );
};

export default DashboardDetailCard;
