package usecase

type Usecase struct {
	p Provider
}

func NewUsecase(provider Provider) *Usecase {
	return &Usecase{p: provider}
}
