import type { StorePanelProps } from '../types/StorePanelProps';
import './StorePanel.css';

function StorePanel(props: StorePanelProps) {
    return (
        <div className="StorePanel">
            <p>{props.store.name}</p>
        </div>
    )
}

export default StorePanel;