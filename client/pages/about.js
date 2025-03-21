import { MainLayout } from "../src/layouts"
import { AboutPage } from "../src/pages/AboutPage"

const About = () => {
  return <AboutPage />
}

About.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>
}

export default About

