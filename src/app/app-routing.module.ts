import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('./modules/gio/portada/portada/portada.module').then(m => m.PortadaModule)
	},
	{
		path: 'sesion-iniciar',
		loadChildren: () => import('./modules/gio/usuarios/sesion-iniciar/sesion-iniciar.module').then(m => m.SesionIniciarModule)
	},
	{
	path        : 'usuario-registrar',
	loadChildren: () => import('./modules/gio/usuarios/usuario-registrar/usuario-registrar.module').then(m => m.UsuarioRegistrarModule)
	},
	{
		path        : 'usuario-perfil',
		loadChildren: () => import('./modules/gio/usuarios/perfil/perfil.module').then(m => m.PerfilModule)
	},
	// ============ Trámites ===============
	{
		path: 'tramites-landing',
		loadChildren: () => import('./modules/gio/tramites/tramites-landing/tramites-landing.module').then(m => m.TramitesLandingModule)
	},
	{
		path: 'tramites-lista/:id',
		loadChildren: () => import('./modules/gio/tramites/tramites-lista/tramites-lista.module').then(m => m.TramitesListaModule)
	},
	{
		path: 'tramite-view/:id/:from',
		loadChildren: () => import('./modules/gio/tramites/tramite-view/tramite-view.module').then(m => m.TramiteViewModule)
	},
	// ============ Chats ===============
	{
		path: 'chats-list/:lista',
		loadChildren: () => import('./modules/gio/chat/chats-list/chats-list.module').then(m => m.ChatsListModule)
	},
	{
		path: 'chats-landing/:lista',
		loadChildren: () => import('./modules/gio/chat/chats-landing/chats-landing.module').then(m => m.ChatsLandingModule)
	},
	{
		path: 'chat-view',
		loadChildren: () => import('./modules/gio/chat/chat-view/chat-view.module').then(m => m.ChatViewModule)
	},
	{
		path: 'chat-admin',
		loadChildren: () => import('./modules/gio/chat/chat-admin/chat-admin.module').then(m => m.ChatAdminModule)
	},
	// =========================== 	FORMULARIOS
	{
		path: 'formulario-anonimo',
		loadChildren: () => import('./modules/gio/formularios/formulario-anonimo/formulario-anonimo.module').then(m => m.FormularioAnonimoModule)
	},
	{
		path: 'formulario-sesion/:formulario',
		loadChildren: () => import('./modules/gio/formularios/formulario-sesion/formulario-sesion.module').then(m => m.FormularioSesionModule)
	},
	{
		path: 'sitios',
		loadChildren: () => import('./modules/gio/sitios/sitios.module').then(m => m.SitiosModule)
	},
	// ============ Administrador ===============
	{
		path: 'admin-tabla/:tabla', 
		loadChildren: () => import('./modules/gio/admin/admin-tabla/admin-tabla.module').then(m => m.AdminTablaModule)
	}, 
	{
		path: 'admin-usuarios-lista', 
		loadChildren: () => import('./modules/gio/admin/usuarios-lista/usuarios-lista.module').then(m=>m.UsuariosListaModule)
	}, 
	{
		path: 'admin-menus', 
		loadChildren: () => import('./modules/gio/admin/menus/menus.module').then(m => m.MenusModule)
	}, 
	{
		path: 'tramites-revisar/:dependencia', 
		loadChildren: () => import('./modules/gio/admin/admin-tramites-revisar/admin-tramites-revisar.module').then(m => m.AdminTramitesRevisarModule)
	}, 
	{
		path: 'peticiones-revisar/:dependencia', 
		loadChildren: () => import('./modules/gio/admin/admin-peticiones-revisar/admin-peticiones-revisar.module').then(m => m.AdminPeticionesRevisarModule)
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
