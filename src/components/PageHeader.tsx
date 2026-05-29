type PageHeaderProps = {
  title: string;
  description: string;
};

function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <h2 className="text-3xl font-bold text-core-ink">{title}</h2>
      <p className="mt-2 max-w-3xl text-sm leading-6 text-core-muted">{description}</p>
    </header>
  );
}

export default PageHeader;
