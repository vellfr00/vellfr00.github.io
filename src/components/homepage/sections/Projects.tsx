import { useTranslation } from "react-i18next";
import { GitHubRepositoryInformation, getUserPublicRepositories, getUserPublicRepositoriesLastModified } from "../../../integration/github.integration";
import { useEffect, useState } from "react";
import { Card, CardContent, Chip, CircularProgress, Divider } from "@mui/joy";
import Slider from "react-slick";
import ErrorIcon from '@mui/icons-material/Error';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OperationStatusFeedback from "../../common/OperationStatusFeedback";

interface ProjectsProps {
  isLanguageChanged: boolean;
  singleSectionClassName: string;
  wasSectionViewed: boolean;
}

function Projects({ isLanguageChanged, singleSectionClassName, wasSectionViewed }: ProjectsProps) {
  const HOMEPAGE_PROJECTS_CLASSNAME = "homepage-projects";
  const PROJECTS_CONTAINER_ID = "projects-container";
  const LAST_REPOSITORIES_UPDATE_ID = "last-repositories-update";

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [repositories, setRepositories] = useState<GitHubRepositoryInformation[] | null>(null);
  const [repositoriesLastUpdate, setRepositoriesLastUpdate] = useState<Date | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  /**
   * Fetch user public repositories when component mounts.
   * */
  useEffect(() => {
    getUserPublicRepositories("vellfr00")
      .then((repositories) => {
        if (repositories) {
          setRepositories(repositories);
        } else {
          setIsError(true);
        }

        setIsLoading(false);
      })
      .then(() => getUserPublicRepositoriesLastModified("vellfr00"))
      .then((lastUpdate) => setRepositoriesLastUpdate(lastUpdate))
      .catch((error) => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const { t } = useTranslation("pages/Homepage");

  return (
    <div className={`${singleSectionClassName} ${HOMEPAGE_PROJECTS_CLASSNAME}`}>
      <h2>{t("Projects.TITLE")}</h2>
      <p>{t("Projects.PRESENTATION")}</p>
      <p>{t("Projects.DISCLAIMER")}</p>
      { !isLoading && !isError && 
        <p id={LAST_REPOSITORIES_UPDATE_ID}>
          ( { t('Projects.LAST_DATA_UPDATE', { repositoriesLastUpdate: repositoriesLastUpdate?.toLocaleDateString(t('Projects._date_locale')) }) } )
        </p>
      }
      <div id={PROJECTS_CONTAINER_ID}>
        {
          isLoading ? 
          <OperationStatusFeedback
            status="LOADING"
            icon={<CircularProgress />}
            message={t("Projects.LOADING")}
            justifyContent="CENTER"
          /> :
          ( 
            isError ? 
            <OperationStatusFeedback
              status="ERROR"
              icon={<ErrorIcon />}
              message={t("Projects.ERROR_LOADING")}
              justifyContent="CENTER"
            /> : repositories && 
            <>
              <GitHubRepositoriesCarousel repositories={repositories} />
            </>
          )
        }
      </div>
    </div>
  );
}

function GitHubRepositoriesCarousel({ repositories }: { repositories: GitHubRepositoryInformation[] }) {
  const DESKTOP_SLIDE_NUMBER = 3;
  const MOBILE_SLIDE_NUMBER = 1;

  const MOBILE_MAX_WIDTH = 768;

  /** Check if we are on mobile device (innerWidth < MOBILE_MAX_WIDTH) */
  const isMobile = (): boolean => window.innerWidth < MOBILE_MAX_WIDTH;

  const [slidesNumber, setSlidesNumber] = useState<number>(isMobile() ? MOBILE_SLIDE_NUMBER : DESKTOP_SLIDE_NUMBER);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setSlidesNumber(isMobile() ? MOBILE_SLIDE_NUMBER : DESKTOP_SLIDE_NUMBER);
    })
  }, []);

  return (
    <Slider
      dots={true}
      infinite={true}
      speed={500}
      slidesToShow={slidesNumber}
      slidesToScroll={slidesNumber}
    >
      {repositories.map((repository, index) => (
        <GitHubRepositoryCard key={index} repository={repository} />
      ))}
    </Slider>
  );
}

function GitHubRepositoryCard({ repository }: { repository: GitHubRepositoryInformation }) {
  const REPOSITORY_CARD_CLASSNAME = "repository-card";
  const REPOSITORY_LASTUPDATE_ID = "repository-lastupdate";
  const REPOSITORY_NAME_ID = "repository-name";
  const REPOSITORY_DESCRIPTION_ID = "repository-description";
  const REPOSITORY_MAIN_LANGUAGE_ID = "repository-main-language";

  const LANGUAGES_ICONS_URLS_MAP: { [key: string]: string } = {
    "TypeScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
    "JavaScript": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    "Rust": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg"
  }; 

  const { t } = useTranslation("pages/Homepage");

  return (
    <Card
      className={REPOSITORY_CARD_CLASSNAME}
      variant="plain"
      onClick={() => window.open(repository.url, "_blank")}
    >
      <CardContent>
        <Chip id={REPOSITORY_LASTUPDATE_ID}>
          <CalendarMonthIcon fontSize="inherit" />
          {repository.lastUpdate.toLocaleDateString(t('Projects._date_locale'))}
        </Chip>
        <h3 id={REPOSITORY_NAME_ID}>{repository.fullName}</h3>
        <p id={REPOSITORY_DESCRIPTION_ID}>{repository.description ?? t("Projects.NO_DESCRIPTION_AVAILABLE")}</p>
        <Divider />
        <Chip id={REPOSITORY_MAIN_LANGUAGE_ID}>
          <img src={LANGUAGES_ICONS_URLS_MAP[repository.mainLanguage]} alt={repository.mainLanguage}/>
          {t('Projects.MAIN_LANGUAGE', { language: repository.mainLanguage })}
        </Chip>
      </CardContent>
    </Card>
  );
}

export default Projects;
