export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-[page-fade-in_750ms_cubic-bezier(0.16,1,0.3,1)] motion-reduce:animate-none">
      {children}
    </div>
  );
}
