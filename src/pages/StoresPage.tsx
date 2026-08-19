import StorePanel from '../objects/StorePanel';
import './StoresPage.css';

function StoresPage() {
    return (
        <div className="StoresPage">
            <div className="StoresPage-header">
                <h1>STORES</h1>
            </div>
            <div className="StoresPage-list">
                <StorePanel store={{name: "Phoenix Games", city: "Capitol Hill"}}/>
                <StorePanel store={{name: "Meeples Games", city: "West Seattle"}}/>
                <StorePanel store={{name: "Over the Brick", city: "Kirkland"}}/>
            </div>
        </div>
    )
}

export default StoresPage;