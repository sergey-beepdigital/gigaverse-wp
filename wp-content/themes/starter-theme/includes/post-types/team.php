<?php

$args = array(
    'labels'             => array(
        'name'          => __('Team'),
        'singular_name' => __('Team')
    ),
    'public'             => false,
    'show_ui'            => true,
    'show_in_menu'       => true,
    'query_var'          => false,
    'capability_type'    => 'page',
    'supports'           => array('title', 'thumbnail'),
    'menu_icon'          => 'dashicons-admin-users'
);
register_post_type('gv_team', $args);

register_taxonomy(
    'gv_team_group',
    'gv_team',
    array(
        'hierarchical'      => true,
        'label'             => __('Groups'),
        'singular_name'     => __('Group'),
        'rewrite'           => array('slug' => 'group-cat'),
        'show_admin_column' => true,
        'show_in_rest'      => true
    )
);