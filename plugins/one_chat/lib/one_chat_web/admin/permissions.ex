defmodule OneChatWeb.Admin.Page.Permissions do
  use OneAdmin.Page

  alias InfinityOne.{Repo, Hooks, Accounts, Permissions}
  alias Accounts.{Role}

  def add_page do
    new(
      "admin_permissions",
      __MODULE__,
      ~g(Permissions),
      OneChatWeb.AdminView,
      "permissions.html",
      40,
      pre_render_check: &check_perissions/2,
      permission: "access-permissions"
    )
  end

  def args(page, user, _sender, socket) do
    # Logger.warn "..."
    preload = Hooks.user_preload []
    user = Repo.preload user, preload

    roles = Repo.all Role
    filter_on = Permissions.show_permission_list()
    permissions = Permissions.all |> Enum.filter(& elem(&1, 0) in filter_on)

    {[
      user: user,
      roles: roles,
      permissions: permissions,
    ], user, page, socket}
  end

  def check_perissions(_page, user) do
    has_permission? user, "access-permissions"
  end

end
