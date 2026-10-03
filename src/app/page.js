import HomeCard from "@/components/HomeCard";
import DeskScene from "@/components/desk/DeskScene";

export default function Home() {
  return (
    <>
      <div className="hidden md:block">
        <DeskScene />
      </div>
      <div className="md:hidden">
        <HomeCard />
      </div>
    </>
  );
}
