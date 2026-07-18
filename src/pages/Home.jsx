import Hero from "../components/Hero.jsx"
import EpisodeReel from "../components/EpisodeReel.jsx"
import { useSeriesData } from "../hooks/useSeriesData.js"

export default function Home() {
  const { series, episodes } = useSeriesData()
  const sorted = [...episodes].sort((a, b) => a.season - b.season || a.episode - b.episode)

  return (
    <main>
      <Hero series={series} firstEpisodeId={sorted[0]?.id} />
      {sorted.length > 0 && <EpisodeReel title="Episodios" episodes={sorted} />}
    </main>
  )
}
