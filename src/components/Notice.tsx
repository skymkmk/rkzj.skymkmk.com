const Notice = ({ title, children, color, icon }: { title: string; children?: string | JSX.Element; color: string; icon: JSX.Element }) => {
  return (
    <div className={`w-full p-2 ${color} border rounded mb-4`}>
      <div className="flex">
        {icon}
        <h1>{title}</h1>
      </div>
      <p>{children}</p>
    </div>
  );
};

export default Notice;
