import { useTranslation } from "react-i18next"

const AboutPage = () => {
  const { t } = useTranslation()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{t("about.title")}</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-900 dark:text-gray-200 mb-8 font-medium">{t("about.description")}</p>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t("about.mission.title")}</h2>
          <p className="text-gray-900 dark:text-gray-200 font-medium">{t("about.mission.description")}</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t("about.features.title")}</h2>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-900 dark:text-gray-200 font-medium">
              <span className="mr-2 text-gray-900 dark:text-gray-200">•</span>
              {t("about.features.item1")}
            </li>
            <li className="flex items-center text-gray-900 dark:text-gray-200 font-medium">
              <span className="mr-2 text-gray-900 dark:text-gray-200">•</span>
              {t("about.features.item2")}
            </li>
            <li className="flex items-center text-gray-900 dark:text-gray-200 font-medium">
              <span className="mr-2 text-gray-900 dark:text-gray-200">•</span>
              {t("about.features.item3")}
            </li>
            <li className="flex items-center text-gray-900 dark:text-gray-200 font-medium">
              <span className="mr-2 text-gray-900 dark:text-gray-200">•</span>
              {t("about.features.item4")}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t("about.team.title")}</h2>
          <p className="text-gray-900 dark:text-gray-200 font-medium">{t("about.team.description")}</p>
        </section>
      </div>
    </div>
  )
}

export default AboutPage

