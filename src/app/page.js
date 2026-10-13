import BannarSection from "@/component/home/BannarSection";
import HowAdoptionWorks from "@/component/home/HowAdoptionWorks";
import PetCareTips from "@/component/home/PetCareTips";
import PetHeroCTA from "@/component/home/PetHeroCTA";
import SuccessStories from "@/component/home/SuccessStories";
import WhyAdoptSection from "@/component/home/WhyAdoptSection";

export default function Home() {
  return (
    <div >
      <BannarSection />
      <WhyAdoptSection />

      <SuccessStories />

      <PetCareTips />

      <HowAdoptionWorks />

      <PetHeroCTA />
    </div>
  );
}
