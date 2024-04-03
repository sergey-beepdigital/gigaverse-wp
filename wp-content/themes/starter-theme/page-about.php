<?php
/* Template Name: About */

$context = Timber::context();

$timber_post     = Timber::get_post();
$context['post'] = $timber_post;

// Getting All Categories
$context['team_categories'] = Timber::get_terms([
	'taxonomy' => 'gv_team_group'
]);

// Getting All Members
$context['team_list'] = Timber::get_posts( [
	'post_type'      => 'gv_team',
	'posts_per_page' => - 1
] )->to_array();

Timber::render( 'page-about.twig', $context );
