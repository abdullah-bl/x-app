export default function MetricCard({
  Icon,
  title,
  value,
}: {
  title: string
  value: string | number
  Icon?: React.ElementType
}) {
  return (
    <div className="border grid space-y-1 rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="">{title}</h3>
        {Icon && <Icon />}
      </div>
      <span className="text-lg font-medium">{value}</span>
    </div>
  )
}
