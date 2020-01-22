<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://github.com/MaksymSharinDev
 * @since      1.0.0
 *
 * @package    Wp_Aqbtmvp
 * @subpackage Wp_Aqbtmvp/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Wp_Aqbtmvp
 * @subpackage Wp_Aqbtmvp/public
 * @author     Maksym Sharin <Maksym.sharin.work@gmail.com>
 */

class Wp_Aqbtmvp_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Wp_Aqbtmvp_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Wp_Aqbtmvp_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/wp-aqbtmvp-public.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Wp_Aqbtmvp_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Wp_Aqbtmvp_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/wp-aqbtmvp-public.js', array( 'jquery' ), $this->version, false );

	}

	public function bugtracker_page_func( $atts, $content = null ) {
		ob_start();
		include_once( 'partials/'.$this->plugin_name.'-public-display.php' );
		return ob_get_clean();
	}

	public function insert_bug ()
	{
		//id,date,device,replicability,severity,expected_result,actual_result
			$data = array();

			//quando rispetti l'ajax standard di AQ l'action è tolta dalla fonte
			foreach( $_REQUEST as $key => $value) //metti il post
			{
				$key = str_replace(' ', '_', $key);
				$key = strtolower ($key);
				$data[$key]=$value;
			}
			unset($data['action']); //togli
			unset($data['id']); //togli
			global $wpdb;
			$res=$wpdb->insert($wpdb->prefix  . "bugs", $data );
				wp_send_json(json_encode($data));
	}
	public function  get_bugs()
	{

		global $wpdb;
		$table=$wpdb->prefix."bugs";

		$sqlString = "SELECT * FROM " . $table;
		$Array= $_REQUEST['AlreadyOnPageID'];
		if ( isset($Array) && count($Array) > 0  )
		{
			$sqlString .= ' WHERE id NOT IN (';
			foreach ( $Array as $key => $ID )
			{
				$sqlString .= $ID;
                if( $key < (count($Array)-1) )
                {
	                $sqlString .= ',';
                }

			}
			$sqlString .= ')' ;
		}

		$data = $wpdb->get_results( $sqlString , ARRAY_A );


		wp_send_json(json_encode($data));
	}
	public function delete_bug(){
		global $wpdb;
		$nrows = $wpdb->delete( $wpdb->prefix . "bugs" , array( 'ID' => $_REQUEST['id']) );

		wp_send_json(
			json_encode(
				array( 'nrows' => $nrows )
			)
		);

	}
	public function update_bug(){
		//id,date,device,replicability,severity,expected_result,actual_result
		$data = array();

		foreach( $_REQUEST as $key => $value)
		{
			$key = str_replace(' ', '_', $key);
			$key = strtolower ($key);
			$data[$key]=$value;
		}
		$id=$data['id'];
		unset($data['action']);
		unset($data['id']);

		global $wpdb;
		$result=$wpdb->update($wpdb->prefix  . "bugs", $data , ['id' => $id ] );

		wp_send_json(json_encode($result));
	}

}
