import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useDeviceDetect } from '../hooks/useDeviceDetect'

const PortfolioButton = () => {
  const { t } = useTranslation()
  const { isMobile } = useDeviceDetect()

  const handleClick = () => {
    if (isMobile) {
      alert(t('viewPortfolio'))
    } else {
      window.location.href = '/portfolio'
    }
  }

  return (
    <motion.div
      className="portfolio-button"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
    >
      <span>{t('viewPortfolio')}</span>
    </motion.div>
  )
}

export default PortfolioButton