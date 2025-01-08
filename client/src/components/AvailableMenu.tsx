import MenuCard, { MenuItem } from "./MenuCard"


const AvailableMenu = ({menus}:{menus:MenuItem[]}) => {
  return (
    <div className="md:p-4">
  <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menus</h1>
  <div className="grid md:grid-cols-3 gap-6">
    {menus.map((menu: MenuItem) => (
        // <MenuCard/ 
      <MenuCard key={menu.id} menu={menu} addToCart={(menu) => console.log("Added to cart:", menu)} />
    ))}
  </div>
</div>

  )
}

export default AvailableMenu;