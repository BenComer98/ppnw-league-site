import StorePanel from '../objects/StorePanel';
import './Stores.css';

function Stores() {
    return (
        <div className="Stores">
            <div className="Stores-header">
                <h1>STORES</h1>
            </div>
            <div className="Stores-list">
                <StorePanel store={{name: "Phoenix Games", city: "Capitol Hill"}}/>
                <StorePanel store={{name: "Meeples Games", city: "West Seattle"}}/>
                <StorePanel store={{name: "Over the Brick", city: "Kirkland"}}/>
            </div>
        </div>
    )
}

export default Stores;