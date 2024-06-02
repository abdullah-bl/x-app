export default function CustomCard({
  title,
  value,
}: {
  title: string
  value: string | number
}) {
  return (
    <div className="border grid gap-1 rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-base">{title}</h3>
      <h3 className="text-xl font-medium">{value}</h3>
    </div>
  )
}
