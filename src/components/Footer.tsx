import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import collegeLogo from '@/assets/college-logo.png';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={collegeLogo} alt="Logo" className="h-12 w-12" />
              <div>
                <h3 className="text-xl font-bold">Collège Jean Baptiste de la Salle 2</h3>
                <p className="text-sm text-primary-foreground/80">Excellence académique et valeurs humaines</p>
              </div>
            </div>
            <p className="text-primary-foreground/90 text-sm leading-relaxed max-w-md">
              Notre établissement forme les citoyens de demain dans un environnement bienveillant, 
              alliant tradition lasallienne et innovation pédagogique.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { name: 'Accueil', href: '/' },
                { name: 'À propos', href: '/about' },
                { name: 'Actualités', href: '/news' },
                { name: 'Contact', href: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">123 Avenue de l'Éducation, 75001 Paris</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">01 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-accent" />
                <span className="text-primary-foreground/80">contact@collegelasalle2.fr</span>
              </li>
            </ul>

            <div className="flex space-x-3 mt-4">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-sm text-primary-foreground/70">
            © 2024 Collège Jean Baptiste de la Salle 2. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;