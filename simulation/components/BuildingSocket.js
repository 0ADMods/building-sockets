function BuildingSocket() {}

BuildingSocket.prototype.Schema = 
"<a:help>Specifies building placement restrictions as they relate to terrain, territories, and distance.</a:help>" +
"<a:example>" +
    "<BuildRestrictions>" +
        "<PlacementType>land</PlacementType>" +
        "<Territory>own</Territory>" +
        "<Category>Special</Category>" +
        "<Distance>" +
            "<FromClass>CivilCentre</FromClass>" +
            "<MaxDistance>40</MaxDistance>" +
        "</Distance>" +
    "</BuildRestrictions>" +
"</a:example>";
const attributes = ["IsMovedOutOfWorld"];


/**
 * Initializes the BuildingSocket Component
 */
BuildingSocket.prototype.Init = function()
{
    this.currentOwner = INVALID_PLAYER;
    this.previousPosition;
};

/**
 * Called when the player tries to build something on top of it.
 * @todo Find a way to call this.
 * @param {*} msg 
 */
BuildingSocket.prototype.OnFoundationPlacedUpon = function(msg)
{
    let cmpOwner = Engine.QueryInterface(this.entity, IID_Ownership);
    if (!cmpOwner)
        return;

    this.currentOwner = cmpOwner.GetOwner();

    if(!this.template.IsMovedOutOfWorld)
        return;

    let cmpPosition = Engine.QueryInterface(this.entity, IID_Position);
	if (!cmpPosition)
        return;

    this.previousPosition = cmpPosition.GetPosition();
    cmpPosition.MoveOutOfWorld();
}

/**
 * Called when the building that was built upon this socket has been destroyed.
 * @param {*} msg 
 */
BuildingSocket.prototype.OnBuildingDeath = function(msg)
{
    this.currentOwner = INVALID_PLAYER;

    if(!this.template.IsMovedOutOfWorld)
    return;

    
    let cmpPosition = Engine.QueryInterface(this.entity, IID_Position);
	if (!cmpPosition)
        return;
}