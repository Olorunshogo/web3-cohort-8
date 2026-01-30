import LatestBlocks from 'src/components/ui/LatestBlocks';

export default function BlocksPage() {
  return (
    <div className="flex flex-col gap-6 p-4 mx-auto lg:p-8 sm:p-6">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
        Blocks Page
      </h1>

      <LatestBlocks limit={25} />
    </div>
  );
}
