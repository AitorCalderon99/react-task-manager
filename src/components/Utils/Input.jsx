export default function Input({label, id, isTextarea = false, ...props}) {
  const classes = "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
  
  return (<p className="flex flex-col gap-1 my-4">
    <label htmlFor={id} className="text-sm font-bold uppercase text-stone-500">{label}</label>
    {isTextarea ? <textarea id={id} {...props}
                            className={classes}/> : <input type="text" className={classes} id={id} {...props}/>}
  </p>)
}
