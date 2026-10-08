import BannarSection from "@/compnonent/home/BannarSection";
import HowAdoptionWorks from "@/compnonent/home/HowAdoptionWorks";
import PetCareTips from "@/compnonent/home/PetCareTips";
import PetHeroCTA from "@/compnonent/home/PetHeroCTA";
import SuccessStories from "@/compnonent/home/SuccessStories";
import WhyAdoptSection from "@/compnonent/home/WhyAdoptSection";

export default function Home() {
  return (
    <div >
     <BannarSection/>
      <WhyAdoptSection />

      <SuccessStories />

      <PetCareTips />

      <HowAdoptionWorks />

      <PetHeroCTA />
    </div>
  );
}
