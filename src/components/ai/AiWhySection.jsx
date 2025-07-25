import classNames from "classnames";
import { useTranslations } from "next-intl";
import StyledCaption from "../shared/StyledCaption";
import styles from "./AiWhySection.module.scss";

export default function AiWhySection() {
  const t = useTranslations();

  return (
    <section className={classNames(styles["why-section"], "pb-10")}>
      <div className="container">
        <StyledCaption className="mb-6">{t("ai.why-ai.caption")}</StyledCaption>
        <h2 className={styles["why-section__title"]}>{t("ai.why-ai.title")}</h2>
      </div>
    </section>
  );
}
