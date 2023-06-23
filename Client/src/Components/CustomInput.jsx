// eslint-disable-next-line react/prop-types
export default function Input ({ label, type, event, value }) {
  return (
    <div className="flex gap-2 items-center justify-between">
      <label>{label}</label>
      <input className="w-72 h-10 p-2 border rounded-lg border-blue-700 outline-none"
       type={type}
       onChange={event}
       value={value}
       />
    </div>
  )
}
