

interface DisclosureComponentProps {
  title: string | React.ReactNode;
  children: React.ReactNode;

}

export const DisclosureComponent = ({ title, children }: DisclosureComponentProps) => {
  return <div className="max-w-full p-1">
    <details className="bg-white ring-1 ring-black/5 p-3 rounded-md" >
      <summary className="flex text-sm leading-6 text-slate-900 font-semibold select-noned cursor-pointer">
        
        {title}
      </summary>
      <div className="mt-3 text-sm leading-6 text-slate-600">
        {children}
      </div>
    </details>
  </div>
} 