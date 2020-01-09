<?php

/**
 * Fired during plugin activation
 *
 * @link       https://github.com/MaksymSharinDev
 * @since      1.0.0
 *
 * @package    Wp_Aqbtmvp
 * @subpackage Wp_Aqbtmvp/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Wp_Aqbtmvp
 * @subpackage Wp_Aqbtmvp/includes
 * @author     Maksym Sharin <Maksym.sharin.work@gmail.com>
 */
class Wp_Aqbtmvp_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {

		global $table_prefix, $wpdb;

		$tblname        = 'bugs';
		$wp_track_table = $table_prefix . "$tblname ";

		#Check to see if the table exists already, if not, then create it

		if ( $wpdb->get_var( "show tables like '$wp_track_table'" ) != $wp_track_table ) {
			//id,title,date,device,replicability,severity,expected_result,actual_result
			$sql  = "  CREATE TABLE " . $wp_track_table . " ( ";
			$sql .= "  id  int(11)   NOT NULL auto_increment, ";
			$sql .= "  title  tinytext NOT NULL, ";
			$sql .= "  date  tinytext NOT NULL, ";
			$sql .= "  device  tinytext NOT NULL, ";
			$sql .= "  replicability  tinytext NOT NULL, ";
			$sql .= "  severity  tinytext NOT NULL, ";
			$sql .= "  expected_result  tinytext NOT NULL, ";
			$sql .= "  actual_result  tinytext NOT NULL, ";
			$sql .= "  PRIMARY KEY bug_id (id) ";
			$sql .= ") ";
			$sql .= "ENGINE=MyISAM DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ; ";
			require_once( ABSPATH . '/wp-admin/includes/upgrade.php' );
			dbDelta( $sql );
		}

	}





}
