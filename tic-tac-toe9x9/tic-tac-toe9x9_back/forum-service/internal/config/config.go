package config

type Config struct {
	IP   string `yaml:"ip"`
	Port int    `yaml:"port"`
	DB   DB     `yaml:"db"`
}

type DB struct {
	Host     string `yaml:"host"`
	Port     int    `yaml:"port"`
	User     string `yaml:"user"`
	Password string `yaml:"password"`
	DBname   string `yaml:"dbname"`
}
