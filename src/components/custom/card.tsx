import NumberTicker from "../magicui/number-ticker"

export default function CustomCard({
  title,
  value,
}: {
  title: string
  value: string | number
}) {
  return (
    <div className="border grid space-y-1 rounded-lg p-4 shadow-sm">
      <h3 className="">{title}</h3>
      <span className="text-xl font-medium">{value}</span>
    </div>
  )
}
