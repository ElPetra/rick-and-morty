import s from "./ItemInfo.module.css";
import { PropTypes } from "prop-types";

export const ItemInfo = ({ itemtitle, meaning }) => {
  return (
    <div className={s.item}>
      <p className={s.itemtitle}>{itemtitle}</p>
      <p className={s.meaning}>{meaning}</p>
    </div>
  );
};

ItemInfo.propTypes = {
  itemtitle: PropTypes.string.isRequired,
  meaning: PropTypes.string.isRequired,
};
