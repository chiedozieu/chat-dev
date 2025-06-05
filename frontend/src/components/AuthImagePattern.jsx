const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12">
      <div className="max-w-md text-center">
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`aspect-square rounded-full size-16 bg-primary/50
            animate-pulse
              `}
              style={{ animationDelay: `${i * 5000}ms` }}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-sm text-[#761df2]">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
