import { Link, useNavigate } from "react-router-dom";
import { FaCar, FaUsers, FaLaptop, FaCreditCard, FaWhatsapp, FaSignOutAlt } from 'react-icons/fa'
import { useState } from "react";
import { HttpAuth } from "../../config/Http";
import { logout } from "../../store/actions/login.action";
import { useAppDispatch } from "../../store/hooks";

export default function DesktopHeader() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [siteOpen, setSiteOpen] = useState(false);
    const [financeiroOpen, setFinanceiroOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await HttpAuth.post('/logout');
        } catch (error) {
            console.error('Erro ao encerrar sessão:', error);
        } finally {
            dispatch(logout());
            navigate('/login', { replace: true });
        }
    };
    return (
        <header>
            <nav className="navbar navbar-expand-lg p-0">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src="/logo-x40px.png" alt="Bootstrap" height="40" />
                    </Link>
                    <div className="justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link d-flex flex-row" aria-current="page" to="/">
                                    <FaCar className="icon-lg mr-2 mt-1" />
                                    <span>Veículos</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link d-flex flex-row" aria-current="page" to="/owners">
                                    <FaUsers className="icon-lg mr-2 mt-1" />
                                    <span>Proprietários</span>
                                </Link>
                            </li>
                            <li
                                className={`nav-item dropdown ${siteOpen ? 'show' : ''}`}
                                onMouseEnter={() => setSiteOpen(true)}
                                onMouseLeave={() => setSiteOpen(false)}
                            >
                                <Link
                                    className={`nav-link d-flex flex-row ${siteOpen ? 'show' : ''
                                        }`}
                                    aria-current="page"
                                    to="/"
                                >
                                    <FaLaptop className="icon-lg mr-2 mt-1" />
                                    <span>Site</span>
                                </Link>

                                <ul className={`mt-2 dropdown-menu ${siteOpen ? 'show' : ''}`}>
                                    <li>
                                        <Link className="dropdown-item nav-link ml-1" to="/">
                                            Otimização para o Google
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item nav-link ml-1" to="/">
                                            Unidades e Telefones
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item nav-link ml-1" to="/">
                                            Configurações
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li
                                className={`nav-item dropdown ${financeiroOpen ? 'show' : ''}`}
                                onMouseEnter={() => setFinanceiroOpen(true)}
                                onMouseLeave={() => setFinanceiroOpen(false)}
                            >
                                <Link
                                    className={`nav-link d-flex flex-row ${financeiroOpen ? 'show' : ''
                                        }`}
                                    aria-current="page"
                                    to="/"
                                >
                                    <FaCreditCard className="icon-lg mr-2 mt-1" />
                                    <span>Financeiro</span>
                                </Link>

                                <ul className={`mt-2 dropdown-menu ${financeiroOpen ? 'show' : ''}`}>
                                    <li>
                                        <Link className="dropdown-item nav-link ml-1" to="/">
                                            Meu plano
                                        </Link>
                                    </li>

                                    <li>
                                        <Link className="dropdown-item nav-link ml-1" to="/">
                                            Minhas transações
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link d-flex flex-row" aria-current="page" to="/">
                                    <FaWhatsapp className="icon-lg mr-2 mt-1" />
                                    <span>Ajuda</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button type="button" className="nav-link d-flex flex-row border-0 bg-transparent" aria-current="page" onClick={() => void handleLogout()}>
                                    <FaSignOutAlt className="icon-lg mr-2 mt-1" />
                                    <span>Sair</span>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header >
    )
}
