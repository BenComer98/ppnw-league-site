import { useContext, useEffect, useMemo, useState } from 'react';
import './PlayersPage.css';
import { ClientContext } from '../context/ClientContext';
import type { PlayerWithFKs } from '../types/db_entities/SupabaseTypes';
import { getPlayersWithFKs } from '../api/supabaseApi';
import { Link } from 'react-router-dom';

type SortColumn = 'name' | 'favorite_deck' | 'home_store';
type SortDirection = 'asc' | 'desc';

const PLAYERS_PER_PAGE = 25;

function PlayersPage() {
    const [playersList, setPlayersList] = useState<PlayerWithFKs[]>([]);
    const [loading, setLoading] = useState(true);

    const [sortColumn, setSortColumn] = useState<SortColumn>('name');
    const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
    const [currentPage, setCurrentPage] = useState(1);

    const context = useContext(ClientContext);

    useEffect(() => {
        if (!context) {
            return;
        }

        async function fetchData() {
            setLoading(true);

            try {
                const playerData = (await getPlayersWithFKs(context!.client)).filter((player: PlayerWithFKs) => {
                    return player.id != 0;
                });
                setPlayersList(playerData);
            } catch (error) {
                console.error('Failed to fetch player data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [context]);

    const sortedPlayers = useMemo(() => {
        return [...playersList].sort((a, b) => {
            let valueA = '';
            let valueB = '';

            switch (sortColumn) {
                case 'name':
                    valueA = a.name ?? '';
                    valueB = b.name ?? '';
                    break;

                case 'favorite_deck':
                    valueA = a.favorite_deck?.name ?? '';
                    valueB = b.favorite_deck?.name ?? '';
                    break;

                case 'home_store':
                    valueA = a.home_store?.name ?? '';
                    valueB = b.home_store?.name ?? '';
                    break;
            }

            // Missing values always sort last, regardless of direction.
            if (!valueA && valueB) return 1;
            if (valueA && !valueB) return -1;

            const comparison = valueA.localeCompare(valueB, undefined, {
                sensitivity: 'base',
            });

            return sortDirection === 'asc' ? comparison : -comparison;
        });
    }, [playersList, sortColumn, sortDirection]);


    const totalPages = Math.ceil(sortedPlayers.length / PLAYERS_PER_PAGE);

    const paginatedPlayers = useMemo(() => {
        const startIndex = (currentPage - 1) * PLAYERS_PER_PAGE;
        const endIndex = startIndex + PLAYERS_PER_PAGE;

        return sortedPlayers.slice(startIndex, endIndex);
    }, [sortedPlayers, currentPage]);

    function handleSort(column: SortColumn) {
        if (sortColumn === column) {
            setSortDirection((current) =>
                current === 'asc' ? 'desc' : 'asc'
            );
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }

        setCurrentPage(1);
    }

    function getSortIndicator(column: SortColumn) {
        if (sortColumn !== column) {
            return '';
        }

        return sortDirection === 'asc' ? ' ▲' : ' ▼';
    }

    function goToPage(page: number) {
        setCurrentPage(Math.max(1, Math.min(page, totalPages)));
    }

    return (
        <div className="PlayersPage">
            <div className="PlayersPage-header">
                <h1>PLAYERS</h1>
            </div>

            {loading ? (
                <p>Loading players...</p>
            ) : (
                <>
                    <table className="PlayersPage-table">
                        <thead>
                            <tr>
                                <th>
                                    <button
                                        type="button"
                                        onClick={() => handleSort('name')}
                                    >
                                        Player{getSortIndicator('name')}
                                    </button>
                                </th>

                                <th>
                                    <button
                                        type="button"
                                        onClick={() => handleSort('favorite_deck')}
                                    >
                                        Favorite Deck{getSortIndicator('favorite_deck')}
                                    </button>
                                </th>

                                <th>
                                    <button
                                        type="button"
                                        onClick={() => handleSort('home_store')}
                                    >
                                        Home Store{getSortIndicator('home_store')}
                                    </button>
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {paginatedPlayers.map((player) => (
                                <tr key={player.id}>
                                    <td>
                                        {player.id ? (
                                            <Link to={`/players/${player.id}`}>
                                                {player.name}
                                            </Link>
                                        ) : (
                                            player.name
                                        )}
                                    </td>

                                    <td>
                                        {player.favorite_deck?.id ? (
                                            <Link
                                                to={`/decks/${player.favorite_deck.id}`}
                                            >
                                                {player.favorite_deck.name}
                                            </Link>
                                        ) : (
                                            player.favorite_deck?.name ?? '-'
                                        )}
                                    </td>

                                    <td>
                                        {player.home_store?.id ? (
                                            <Link
                                                to={`/stores/${player.home_store.id}`}
                                            >
                                                {player.home_store.name}
                                            </Link>
                                        ) : (
                                            player.home_store?.name ?? '-'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPages > 1 && (
                        <div className="PlayersPage-pagination">
                            <button
                                type="button"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    type="button"
                                    onClick={() => goToPage(page)}
                                    className={
                                        page === currentPage ? 'active' : ''
                                    }
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                type="button"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default PlayersPage;
