import MenuCard, { MenuItem } from "./MenuCard"


const AvailableMenu = ({menus}:{menus:MenuItem[]}) => {
  return (
    <div className="md:p-4 w-full">
  <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menus</h1>
  <div className="grid md:grid-cols-3 gap-6 w-full">
    {menus.map((menu:any) => (
        // <MenuCard/ 
      <MenuCard key={menu.id} menu={menu} />
    ))}
  </div>
</div>

  )
}

export default AvailableMenu;