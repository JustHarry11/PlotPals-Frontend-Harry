import './Footer.css'

export default function Footer() {
    return (
        <footer className="footer">
            <p>
                © {new Date().getFullYear()} PlotPals | Designed & Developed by &lt;<a href="https://github.com/Ryziou" target='_blank' rel='noopener noreferrer'>Callum Liu</a> & <a href="https://github.com/JustHarry11" target='_blank' rel='noopener noreferrer'>Harry Lippa</a>&gt;
            </p>
      <a href="https://github.com/Ryziou/PlotPals-Frontend" target='_blank' rel='noopener noreferrer'>
        <img src="https://res.cloudinary.com/dit5y4gaj/image/upload/v1747823098/github-mark-white_iymleu.png" alt="GitHub" width="30" height="30"/>
      </a>
        </footer>
    )
}