import { MainLayout } from "../src/layouts"
import { HomePage } from "../src/components/home/HomePage"

const Home = () => {
  return <HomePage />
}

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}

export default Home

